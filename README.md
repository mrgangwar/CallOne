CALLONE – SECURE AUDIO & VIDEO CALLING APP

CallOne is a modern React-based audio and video calling application built using ZEGOCLOUD UIKit Prebuilt and the ZIM Web SDK.
It enables real-time one-to-one voice and video calls with call invitations, encryption, and a polished user interface.

FEATURES

• HD Video Calling
• High Quality Voice Calling
• Call Invitation System (ZIM Plugin)
• End-to-End Encrypted Communication
• User-to-User Calling via Unique User ID
• Real-time Connection Status Indicator
• Modern Glassmorphism UI
• Lightweight & Fast Performance

TECH STACK

• React.js
• ZEGOCLOUD UIKit Prebuilt
• ZIM Web SDK
• Tailwind CSS
• Lucide React Icons

PROJECT SETUP

Clone the repository

git clone https://github.com/your-username/callone.git

cd callone

Install dependencies

npm install

Run the project

npm run dev

OR (Create React App)

npm start

ZEGO CONFIGURATION

The application requires ZEGOCLOUD credentials.

In App.jsx:

const appID = YOUR_APP_ID;
const serverSecret = "YOUR_SERVER_SECRET";

IMPORTANT:
Do NOT expose the serverSecret in production environments.
Always generate tokens securely using a backend server.

HOW THE APPLICATION WORKS

When the app loads, a random User ID is generated.

The user can initiate:
• Video Call
• Voice Call

Enter the target user's ID.

A call invitation is sent via the ZIM plugin.

Once the invitation is accepted, the call begins instantly.

CALL STATES

Landing Screen:
• Displays system connection status
• Shows your unique User ID
• Options to start Video or Voice call

Active Call Screen:
• Call in progress indicator
• Floating control panel:

Mute / Unmute microphone

Enable / Disable video

End call button

CALL EVENTS HANDLED

• Incoming call accepted
• Outgoing call accepted
• Call rejected
• Call ended

These events are handled using ZegoUIKitPrebuilt call invitation configuration.

SECURITY

• End-to-end encrypted communication
• Secure token-based authentication
• Powered by ZEGOCLOUD infrastructure

LICENSE

MIT License

ACKNOWLEDGEMENTS

• ZEGOCLOUD – https://www.zegocloud.com

• Lucide Icons – https://lucide.dev

• Tailwind CSS – https://tailwindcss.com

SUPPORT

If you find this project useful, please consider starring the repository
and contributing improvements.

END OF FILE