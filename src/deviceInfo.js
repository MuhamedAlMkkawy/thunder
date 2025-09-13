// deviceInfo.js
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getDeviceInfo = async () => {
  // Load the FingerprintJS instance asynchronously
  const fp = await FingerprintJS.load();
  
  // Get the fingerprint result
  const result = await fp.get();

  // Get the user agent to determine the OS and device type
  const userAgent = navigator.userAgent;
  let os = "Unknown OS";
  let identifierType = "Unknown Identifier";

  // Detect the OS and device type based on the user agent
  if (/Windows/i.test(userAgent)) {
    os = "Windows";
    identifierType = "Windows Device";
  } else if (/Macintosh|Mac/i.test(userAgent)) {
    os = "Mac";
    identifierType = "Mac Device";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    os = "iOS";
    identifierType = "iOS Device";
  } else if (/Android/i.test(userAgent)) {
    os = "Android";
    identifierType = "Android Device";
  } else if (/Linux/i.test(userAgent)) {
    os = "Linux";
    identifierType = "Linux Device";
  }

  // Return the device information, including the unique device ID from FingerprintJS
  return {
    deviceId: result.visitorId,  // Unique device identifier
    os: os,                      // Operating System
    identifierType: identifierType  // Device type (e.g., Android, iOS)
  };
};

export default getDeviceInfo;
