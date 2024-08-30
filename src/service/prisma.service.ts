import { PrismaClient } from "@prisma/client";

class PrismaService extends PrismaClient{

    async onModuleInit() {
        await this.$connect();
    }

}

export default new PrismaService()