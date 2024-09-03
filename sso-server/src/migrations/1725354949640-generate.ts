import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1725354949640 implements MigrationInterface {
    name = 'Generate1725354949640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" character varying NOT NULL, "medicalRecordNumber" integer NOT NULL, "allergies" character varying, "medicalHistory" character varying, "insuranceInformation" character varying, CONSTRAINT "UQ_ccc46911046ecf1a58284021d56" UNIQUE ("medicalRecordNumber"), CONSTRAINT "PK_782e2dc26461757e2d9e4acc7c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_c3032565d23946a124aed0f3534" UNIQUE ("age")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "contact" character varying`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "patientInfoId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_43ccb4d13b4bcd099ef545b4926" UNIQUE ("patientInfoId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_43ccb4d13b4bcd099ef545b4926" FOREIGN KEY ("patientInfoId") REFERENCES "patient_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_43ccb4d13b4bcd099ef545b4926"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_43ccb4d13b4bcd099ef545b4926"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "patientInfoId"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "contact"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_c3032565d23946a124aed0f3534"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "age"`);
        await queryRunner.query(`DROP TABLE "patient_info"`);
    }

}
