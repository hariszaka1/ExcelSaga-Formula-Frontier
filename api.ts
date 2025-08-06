import { db, saveDb } from './database';
import { levelData } from './constants';
import type { LevelCompletionStatus, UserView, User, CertificateRecord, CertificateSettings } from './types';

const NETWORK_DELAY = 500; // ms

const getDefaultCompletionStatus = (): LevelCompletionStatus => {
  return levelData.reduce((acc, _, index) => {
    acc[index] = false;
    return acc;
  }, {} as LevelCompletionStatus);
};

const generateCertificateId = () => `ESC-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

export const api = {
  login: (email: string, password_input: string): Promise<{ user: User | null; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = db.users[email.toLowerCase()];
        if (user && user.type === 'password' && user.password === password_input) {
          user.lastLoginAt = Date.now();
          saveDb();
          resolve({ user });
        } else {
          resolve({ user: null, error: 'Email atau password salah' });
        }
      }, NETWORK_DELAY);
    });
  },

  register: (fullName: string, phone: string, email: string, password_input: string): Promise<{ user: User | null; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerCaseEmail = email.toLowerCase();
        if (db.users[lowerCaseEmail]) {
          resolve({ user: null, error: 'Email sudah terdaftar.' });
          return;
        }

        const newUser: User = {
          id: lowerCaseEmail,
          type: 'password',
          password: password_input,
          fullName,
          phone,
          progress: getDefaultCompletionStatus(),
          isAdmin: false,
          isMember: false,
          createdAt: Date.now(),
        };

        db.users[lowerCaseEmail] = newUser;
        saveDb();
        resolve({ user: newUser });
      }, NETWORK_DELAY);
    });
  },

  registerOrLoginWithGoogle: (email: string, password_input: string): Promise<{ user: User | null; error?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerCaseEmail = email.toLowerCase();
            let user = db.users[lowerCaseEmail];

            if (user && user.type === 'password') {
                resolve({ user: null, error: 'Email ini sudah terdaftar dengan login password biasa. Silakan login menggunakan password.' });
                return;
            }

            if (!user) {
                // New user registration via Google
                user = {
                    id: lowerCaseEmail,
                    type: 'google',
                    password: password_input,
                    progress: getDefaultCompletionStatus(),
                    fullName: email.split('@')[0],
                    isMember: false,
                    createdAt: Date.now(),
                };
                db.users[lowerCaseEmail] = user;
            } else {
                // Existing Google user, now setting a password
                user.password = password_input;
            }
            
            user.lastLoginAt = Date.now();
            saveDb();
            resolve({ user });
        }, NETWORK_DELAY);
    });
  },
  
  getUserById: (id: string): Promise<{ user: User | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = db.users[id];
        resolve({ user: user || null });
      }, NETWORK_DELAY / 2); // Faster than login
    });
  },

  loadProgress: (userId: string): Promise<{ progress: LevelCompletionStatus | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = db.users[userId];
        if (user) {
          resolve({ progress: user.progress });
        } else {
          resolve({ progress: null });
        }
      }, NETWORK_DELAY);
    });
  },
  
  saveProgress: (userId: string, progress: LevelCompletionStatus): Promise<{ success: boolean }> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const user = db.users[userId];
              if(user) {
                  user.progress = progress;
                  saveDb();
                  resolve({ success: true });
              } else {
                  resolve({ success: false });
              }
          }, NETWORK_DELAY);
      });
  },

  getUsers: (): Promise<{ users: User[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allUsers = Object.values(db.users);
        resolve({ users: allUsers });
      }, NETWORK_DELAY);
    });
  },
  
  updateAdminPassword: (adminId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = db.users[adminId];
        if (user && user.isAdmin && user.type === 'password') {
          if (user.password !== currentPassword) {
            return resolve({ success: false, error: 'Password lama salah.' });
          }
          if (newPassword.length < 6) {
            return resolve({ success: false, error: 'Password baru harus minimal 6 karakter.' });
          }
          user.password = newPassword;
          saveDb();
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'Pengguna tidak ditemukan atau bukan admin.' });
        }
      }, NETWORK_DELAY);
    });
  },

  updateUserMembership: (userId: string, isMember: boolean): Promise<{ success: boolean, user?: User, error?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = db.users[userId];
            if(user) {
                user.isMember = isMember;
                saveDb();
                resolve({ success: true, user });
            } else {
                resolve({ success: false, error: "User not found" });
            }
        }, NETWORK_DELAY)
    })
  },
  
  updateUserProfile: (userId: string, fullName: string, phone: string): Promise<{ success: boolean, user?: User, error?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = db.users[userId];
            if(user) {
                user.fullName = fullName;
                user.phone = phone;
                saveDb();
                resolve({ success: true, user });
            } else {
                resolve({ success: false, error: "User not found" });
            }
        }, NETWORK_DELAY)
    })
  },

  updateUserPassword: (userId: string, currentPassword: string, newPassword: string): Promise<{success: boolean, error?: string}> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const user = db.users[userId];
              if(!user || user.type !== 'password') {
                  return resolve({ success: false, error: 'Pengguna tidak valid atau bukan pengguna dengan password.' });
              }
              if (user.password !== currentPassword) {
                  return resolve({ success: false, error: 'Password saat ini salah.' });
              }
              if (newPassword.length < 6) {
                return resolve({ success: false, error: 'Password baru harus minimal 6 karakter.' });
              }
              user.password = newPassword;
              saveDb();
              resolve({ success: true });
          }, NETWORK_DELAY)
      })
  },

  deleteUser: (userIdToDelete: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = db.users[userIdToDelete];
        if (!user) {
          return resolve({ success: false, error: 'Pengguna tidak ditemukan.' });
        }
        if (user.isAdmin) {
          return resolve({ success: false, error: 'Tidak dapat menghapus akun admin.' });
        }
        delete db.users[userIdToDelete];
        saveDb();
        resolve({ success: true });
      }, NETWORK_DELAY);
    });
  },

  createCertificate: (userId: string, fullName: string): Promise<{ certificate: CertificateRecord | null; error?: string }> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const user = db.users[userId];
              if (!user) {
                  return resolve({ certificate: null, error: "User not found." });
              }
              if (user.certificate) {
                  return resolve({ certificate: user.certificate, error: "Certificate already exists." });
              }

              const newCertificate: CertificateRecord = {
                  id: generateCertificateId(),
                  userId: user.id,
                  userName: fullName,
                  issuedAt: Date.now(),
              };

              db.certificates[newCertificate.id] = newCertificate;
              user.certificate = newCertificate;
              saveDb();

              resolve({ certificate: newCertificate });
          }, NETWORK_DELAY);
      });
  },

  getCertificates: (): Promise<{ certificates: CertificateRecord[] }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const allCertificates = Object.values(db.certificates).sort((a,b) => b.issuedAt - a.issuedAt);
            resolve({ certificates: allCertificates });
        }, NETWORK_DELAY);
    });
  },

  getCertificateSettings: (): Promise<{ settings: CertificateSettings }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ settings: db.certificateSettings });
        }, NETWORK_DELAY / 2);
    });
  },

  updateCertificateSettings: (newSettings: CertificateSettings): Promise<{ success: boolean, error?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            db.certificateSettings = newSettings;
            saveDb();
            resolve({ success: true });
        }, NETWORK_DELAY);
    });
  },
};