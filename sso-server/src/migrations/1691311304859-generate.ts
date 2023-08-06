import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1691311304859 implements MigrationInterface {
    name = 'Generate1691311304859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying, "isActive" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."social_external_providers_externaltype_enum" AS ENUM('0')`);
        await queryRunner.query(`CREATE TABLE "social_external_providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "externalType" "public"."social_external_providers_externaltype_enum" NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "providerId" character varying NOT NULL, "picture" character varying NOT NULL, "emailVerified" boolean NOT NULL, "locale" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_d1c995cf7d74b332d6d07328b29" UNIQUE ("providerId"), CONSTRAINT "PK_88df7aa60f0a9331745e3861317" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "social_external_providers" ADD CONSTRAINT "FK_621f334bacb736f2151442b6331" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_external_providers" DROP CONSTRAINT "FK_621f334bacb736f2151442b6331"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`DROP TABLE "social_external_providers"`);
        await queryRunner.query(`DROP TYPE "public"."social_external_providers_externaltype_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
