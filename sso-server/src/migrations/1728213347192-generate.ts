import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1728213347192 implements MigrationInterface {
    name = 'Generate1728213347192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."weekly_schedules_dayofweek_enum" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')`);
        await queryRunner.query(`CREATE TABLE "weekly_schedules" ("id" SERIAL NOT NULL, "DayOfWeek" "public"."weekly_schedules_dayofweek_enum" NOT NULL, "StartTime" TIME NOT NULL, "EndTime" TIME NOT NULL, "doctorId" uuid NOT NULL, CONSTRAINT "UQ_8573f62981efa005e71c1d14e21" UNIQUE ("doctorId", "DayOfWeek", "StartTime"), CONSTRAINT "PK_c14aa04ae270430a6eb8444108c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weekly_schedules" ADD CONSTRAINT "FK_9de5f0a82803fd63b7256079198" FOREIGN KEY ("doctorId") REFERENCES "doctor_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weekly_schedules" DROP CONSTRAINT "FK_9de5f0a82803fd63b7256079198"`);
        await queryRunner.query(`DROP TABLE "weekly_schedules"`);
        await queryRunner.query(`DROP TYPE "public"."weekly_schedules_dayofweek_enum"`);
    }

}
