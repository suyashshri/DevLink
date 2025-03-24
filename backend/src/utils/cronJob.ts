import cron from "node-cron";
import { prisma } from "./db";

const unlockExpiredFiles = async () => {
  try {
    await prisma.file.updateMany({
      where: {
        isLocked: true,
        updatedAt: { lt: new Date(Date.now() - 15 * 60 * 1000) }, // 15 minutes ago
      },
      data: {
        isLocked: false,
        lockedById: null,
      },
    });

    console.log("Expired file locks removed");
  } catch (error) {
    console.error("Error unlocking expired files:", error);
  }
};

// Run every 5 minutes
cron.schedule("*/5 * * * *", unlockExpiredFiles);
