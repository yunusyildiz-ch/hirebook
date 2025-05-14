// 📂 functions/index.js
import functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import cors from 'cors';
import { dialogflowAPI } from "./dialogflow.js";


// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();
const corsHandler = cors({ origin: true });

/**
 * 🎉 Auth Trigger - Welcome Notification on User Signup
 */
export const sendWelcomeNotification = functions.auth.user().onCreate(async (user) => {
    try {
        const { uid, email } = user;

        // 👤 Firestore'dan firstname'i çek
        const userDoc = await db.collection('users').doc(uid).get();
        const userData = userDoc.exists ? userDoc.data() : null;
        const firstname = userData?.firstname || user.displayName || 'Qatip User';

        await db.collection('notifications').add({
            title: '🎉 Welcome to Qatip!',
            message: `
            <div style="text-align: center;" >
     <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
          width="100" 
          height="100"
          fill="currentColor"
          style="display: block; margin: 10px auto;"
        >
          <g transform="translate(0,300) scale(0.1,-0.1)" stroke="none">
        <path
          d="M853 2560 c-12 -5 -25 -22 -29 -37 -17 -73 -138 -285 -204 -358 -35
          -40 -80 -119 -80 -142 0 -45 49 -56 92 -20 28 24 159 204 221 306 20 33 43 61
          51 61 8 0 24 -17 36 -37 42 -72 164 -214 189 -220 13 -3 60 0 105 6 61 9 97
          10 146 1 36 -6 88 -15 115 -19 28 -4 64 -15 82 -24 18 -9 40 -17 51 -17 33 0
          99 59 153 137 64 95 119 163 129 163 5 0 31 -71 59 -159 47 -146 53 -159 80
          -171 66 -27 95 6 67 77 -10 26 -42 126 -72 221 -52 173 -72 218 -100 229 -27
          10 -64 -7 -80 -39 -9 -18 -40 -56 -68 -86 -28 -29 -76 -90 -106 -134 -30 -45
          -63 -86 -72 -92 -12 -7 -34 -7 -75 2 -32 7 -134 17 -228 23 l-170 10 -50 53
          c-28 29 -77 99 -109 155 -39 70 -66 105 -83 112 -13 5 -25 9 -26 8 -1 0 -12
          -4 -24 -9z"
        />
        <path
          d="M1093 1752 c-61 -48 -43 -135 33 -161 35 -12 46 -12 74 -1 55 23 85
          93 60 140 -21 39 -128 53 -167 22z"
        />
        <path
          d="M1740 1727 c-31 -16 -70 -73 -70 -103 0 -60 52 -104 123 -104 98 0
          131 131 48 190 -38 26 -72 32 -101 17z"
        />
        <path
          d="M157 1723 c-14 -14 -6 -53 16 -77 19 -22 50 -30 262 -70 316 -61 338
          -60 321 9 -11 44 -48 57 -304 101 -256 45 -284 49 -295 37z"
        />
        <path
          d="M2750 1649 c-19 -4 -131 -26 -248 -49 -214 -40 -264 -56 -275 -84 -7
          -19 29 -46 60 -46 39 0 496 79 526 91 38 16 47 57 17 81 -24 20 -28 20 -80 7z"
        />
        <path
          d="M1340 1419 c-34 -14 -70 -49 -70 -69 0 -9 20 -40 45 -69 25 -29 45
          -56 45 -60 0 -26 -44 -60 -86 -67 -58 -8 -75 -35 -47 -72 29 -38 66 -45 132
          -22 l56 19 25 -23 c52 -48 106 -59 159 -31 38 19 44 39 26 81 l-15 35 -52 -6
          c-29 -3 -59 -2 -66 3 -17 11 -34 88 -27 116 4 11 13 37 21 56 20 48 6 86 -41
          105 -39 17 -69 18 -105 4z"
        />
        <path
          d="M504 1376 c-188 -41 -184 -39 -184 -74 0 -34 27 -62 61 -62 50 0 385
          63 398 75 35 33 -25 96 -91 94 -18 0 -101 -15 -184 -33z"
        />
        <path
          d="M2256 1348 c-11 -16 -12 -26 -5 -40 19 -36 80 -53 269 -78 47 -6 106
          -18 132 -26 74 -24 104 3 79 69 -14 36 -71 53 -256 77 -198 25 -200 25 -219
          -2z"
        />
        <path
          d="M637 1043 c-4 -3 -7 -21 -7 -40 0 -38 43 -87 142 -161 72 -55 244
          -128 362 -153 50 -11 135 -31 189 -45 95 -24 105 -24 245 -15 160 11 222 27
          342 85 41 20 84 36 95 36 28 0 81 34 101 65 14 21 14 30 4 55 -13 31 -49 60
          -76 60 -8 0 -34 -13 -57 -30 -46 -33 -289 -121 -383 -140 -49 -10 -84 -9 -190
          4 -144 18 -191 29 -374 86 -144 46 -192 69 -251 125 -73 68 -120 91 -142 68z"
        />
      </g>
        </svg>
      </div>
                <div style="text-align: center;">
                    <h2>Welcome, ${firstname}!</h2>
                    <p>We're thrilled to have you on board with <b>Qatip</b>! 🚀</p>
                    <p>If you need assistance, reach out at 
                    <a href="mailto:support@qatip.app">support@qatip.app</a></p>
                    <p>Best regards,<br><b>Qatip App Developer Team</b></p>
                </div>
            `,
            type: 'info',
            category: 'welcome',
            priority: 'normal',
            icon: 'user-plus',
            url: '/dashboard',
            actionText: 'Get Started',
            to: `user:${uid}`,
            userId: uid,
            isHtml: true,
            readBy: [],
            dismissedBy: [],
            createdAt: Timestamp.now(),
        });

        console.log(`✅ Welcome notification sent to: ${email || uid}`);
    } catch (error) {
        console.error('❌ Error sending welcome notification:', error);
    }
});

/**
 * 📣 HTTP POST - Unified Notification Sender (General and Targeted)
 */
export const sendNotification = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
      if (req.method !== 'POST') {
          res.status(405).send('Method Not Allowed');
          return;
      }

      try {
          const { title, message, type = 'info', category = 'system', priority = 'normal', icon = 'bell', url = '', actionText = 'View', to, userIds = [], isHtml = false } = req.body;

          if (!title?.trim() || !message?.trim()) {
              res.status(400).send('Missing title or message.');
              return;
          }

          // 🌟 Hedef Belirleme
          let targets = [];
          if (to === 'all') {
              targets.push('all');
          } else if (to === 'role:admin') {  // 🛠️ Düzeltme Yapıldı
              targets.push('role:admin');
          } else if (userIds.length > 0) {
            // 🚀 Çoklu Kullanıcı ID'lerini ayrı ayrı hedef olarak ekle
            const userTargets = userIds.map(id => `user:${id}`);
            targets.push(...userTargets);  // Dizi elemanlarını ayrı ayrı ekle
        } else {
              res.status(400).send('Invalid target for notification.');
              return;
          }

          // 🔄 Bildirim Gönderme
          for (const target of targets) {
              await db.collection('notifications').add({
                  title,
                  message,
                  type,
                  category,
                  priority,
                  icon,
                  url,
                  actionText,
                  to: target,
                  isHtml,
                  readBy: [],
                  dismissedBy: [],
                  createdAt: Timestamp.now(),
              });
              console.log(`📣 Notification sent to: ${target}`);
          }

          res.status(200).send('Notifications sent successfully.');
      } catch (error) {
          console.error('❌ Failed to send notification', error);
          res.status(500).send('Internal Server Error');
      }
  });
});

export { dialogflowAPI };

