import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1728039959530 implements MigrationInterface {
    name = 'Generate1728039959530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "time" TIME NOT NULL, "status" character varying(255), "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "patientId" uuid, "doctorId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13c2e57cb81b44f062ba24df57" ON "appointments" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c1af27b469cb8dca420c160d6" ON "appointments" ("doctorId") `);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_0c1af27b469cb8dca420c160d65" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_0c1af27b469cb8dca420c160d65"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c1af27b469cb8dca420c160d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13c2e57cb81b44f062ba24df57"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
