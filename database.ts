
import { levelData } from './constants';
import type { LevelCompletionStatus, User, CertificateRecord, CertificateSettings } from './types';

interface Database {
  users: Record<string, User>;
  certificates: Record<string, CertificateRecord>;
  certificateSettings: CertificateSettings;
}

const DB_KEY = 'excelSagaDatabase';

const getDefaultCompletionStatus = (): LevelCompletionStatus => {
  return levelData.reduce((acc, _, index) => {
    acc[index] = false;
    return acc;
  }, {} as LevelCompletionStatus);
};

const getDefaultCertificateSettings = (): CertificateSettings => ({
    title: "SERTIFIKAT KEAHLIAN",
    awardText: "Sertifikat ini menyatakan bahwa pahlawan legendaris",
    congratsText: "Virtuoso Excel",
    primaryColor: "#107c41", // Excel Green
    secondaryColor: "#334155", // Slate Gray
    signerName: "Ketua Guild",
    signerTitle: "Guild Formula Frontier",
});

// Initialize DB from localStorage or with a default
const loadDb = (): Database => {
  try {
    const savedDb = localStorage.getItem(DB_KEY);
    if (savedDb) {
      const parsed = JSON.parse(savedDb);
      if (parsed && parsed.users) {
        if (!parsed.certificates) {
            parsed.certificates = {};
        }
        if (!parsed.certificateSettings) {
            parsed.certificateSettings = getDefaultCertificateSettings();
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load database from localStorage', e);
  }
  
  // Default DB with admin user
  const defaultAdminProgress = getDefaultCompletionStatus();
  defaultAdminProgress[-1] = true; // Unlock all levels for admin
  const adminCreatedAt = Date.now() - 86400000 * 5; // 5 days ago for chart demo

  return {
    users: {
      'admin@excel.saga': {
        id: 'admin@excel.saga',
        type: 'password',
        password: '123',
        progress: defaultAdminProgress,
        fullName: 'Admin Saga',
        phone: '000',
        isAdmin: true,
        isMember: true,
        createdAt: adminCreatedAt,
        lastLoginAt: adminCreatedAt,
      },
    },
    certificates: {},
    certificateSettings: getDefaultCertificateSettings(),
  };
};

export const db: Database = loadDb();

export const saveDb = () => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Failed to save database to localStorage', e);
  }
};

// Migrate old progress data if it exists. This should run once.
const migrateLegacyData = () => {
  const legacyAuthRaw = localStorage.getItem('excelSagaAuth');
  if (legacyAuthRaw) {
    try {
      const auth = JSON.parse(legacyAuthRaw);
      const user = auth.user;
      if (user && !db.users[user]) {
        const progressKey = `excelSagaProgress_${user}`;
        const progressRaw = localStorage.getItem(progressKey);
        if (progressRaw) {
          const progress = JSON.parse(progressRaw);
          const userType = user === 'admin' ? 'password' : 'google';
          const newUser: User = {
            id: user,
            type: userType,
            progress: progress,
            isMember: false,
            createdAt: Date.now() - 86400000 * 10, // Assume old users are ~10 days old
          };
          if (userType === 'password') {
            newUser.password = '123';
          }
          if (user === 'admin') {
              newUser.isAdmin = true;
              newUser.isMember = true;
              newUser.progress[-1] = true;
          }
          db.users[user] = newUser;
          console.log(`Migrated user ${user} to new DB structure.`);
          localStorage.removeItem(progressKey);
        }
      }
    } catch (e) {
      console.error("Failed to migrate legacy progress", e);
    }
    // Clean up old keys after migration attempt
    localStorage.removeItem('excelSagaAuth');
    try {
        const auth = JSON.parse(legacyAuthRaw);
        if (auth.user) {
            localStorage.removeItem('excelSagaProgress_' + auth.user);
        }
    } catch (e) {
        // ignore
    }
  }
  
  const oldestAuth = localStorage.getItem('excelSagaIsAuthenticated');
  if (oldestAuth) {
     localStorage.removeItem('excelSagaIsAuthenticated');
  }
  
  saveDb();
};

migrateLegacyData();
