import type { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateInit1696615423255 implements MigrationInterface {
  name = 'GenerateInit1696615423255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."entity_state_enum" AS ENUM('active', 'archived')`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "action_resource" character varying NOT NULL, CONSTRAINT "uc_permissions__action_resource" UNIQUE ("action_resource"), CONSTRAINT "pk_permissions__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "is_system" boolean NOT NULL DEFAULT false, "is_default_user_registration" boolean NOT NULL DEFAULT false, CONSTRAINT "uc_roles__name" UNIQUE ("name"), CONSTRAINT "pk_roles__id" PRIMARY KEY ("id")); COMMENT ON COLUMN "roles"."is_system" IS 'system role can''t be deleted'`
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "access_token" character varying NOT NULL, "api_invocation_count" integer NOT NULL DEFAULT '0', "last_access_at" TIMESTAMP WITH TIME ZONE, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "pk_sessions__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "uploads" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "url" character varying NOT NULL, "type" character varying NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "pk_uploads__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "packages" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "service_id" integer NOT NULL, CONSTRAINT "pk_packages__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "features" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "included" boolean NOT NULL DEFAULT false, "service_id" integer NOT NULL, CONSTRAINT "pk_features__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "client_id" character varying NOT NULL, "freelancer_id" character varying NOT NULL, "job_post_id" integer, "service_id" integer, "package_id" integer, "instruction" character varying NOT NULL DEFAULT '', "price" integer NOT NULL DEFAULT '0', "delivery_days" integer NOT NULL DEFAULT '0', CONSTRAINT "pk_orders__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "companies" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "website" character varying, "description" character varying, "user_id" character varying, CONSTRAINT "rc_companies__user_id" UNIQUE ("user_id"), CONSTRAINT "pk_companies__id" PRIMARY KEY ("id")); COMMENT ON COLUMN "companies"."user_id" IS 'match with firebase uid'`
    );
    await queryRunner.query(
      `CREATE TABLE "levels" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "pk_levels__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_types" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "pk_job_types__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "currencies" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "iso_code" character varying NOT NULL, CONSTRAINT "pk_currencies__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment_types" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "pk_payment_types__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, CONSTRAINT "pk_locations__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "how_to_apply" character varying, "max_salary" numeric NOT NULL, "min_salary" numeric NOT NULL, "is_remote" boolean NOT NULL, "application_target " character varying NOT NULL, "user_id" character varying, "company_id" integer, "level_id" integer, "job_type_id" integer, "currency_id" integer, "location_id" integer, "payment_type_id" integer, CONSTRAINT "rc_jobs__user_id" UNIQUE ("user_id"), CONSTRAINT "rc_jobs__company_id" UNIQUE ("company_id"), CONSTRAINT "rc_jobs__level_id" UNIQUE ("level_id"), CONSTRAINT "rc_jobs__job_type_id" UNIQUE ("job_type_id"), CONSTRAINT "rc_jobs__currency_id" UNIQUE ("currency_id"), CONSTRAINT "rc_jobs__location_id" UNIQUE ("location_id"), CONSTRAINT "rc_jobs__payment_type_id" UNIQUE ("payment_type_id"), CONSTRAINT "pk_jobs__id" PRIMARY KEY ("id")); COMMENT ON COLUMN "jobs"."user_id" IS 'match with firebase uid'`
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "slug" character varying NOT NULL, CONSTRAINT "uc_tags__slug" UNIQUE ("slug"), CONSTRAINT "pk_tags__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_posts" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "budget" integer NOT NULL DEFAULT '0', "bids" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'open', "slug" character varying NOT NULL, "category_id" integer NOT NULL, "user_id" character varying NOT NULL, "claimed_by_id" character varying, "views" integer NOT NULL DEFAULT '0', "orders_count" integer NOT NULL DEFAULT '0', "rating" integer NOT NULL DEFAULT '0', "reviews_count" integer NOT NULL DEFAULT '0', CONSTRAINT "uc_job_posts__slug" UNIQUE ("slug"), CONSTRAINT "pk_job_posts__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "content" character varying NOT NULL, "is_read" boolean NOT NULL, "author_id" character varying NOT NULL, "recipient_id" character varying NOT NULL, CONSTRAINT "pk_messages__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "rating" integer NOT NULL, "content" character varying NOT NULL, "rated_by_id" character varying NOT NULL, "service_id" integer NOT NULL, CONSTRAINT "pk_reviews__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "profile_image_url" character varying, "phone_number" character varying, "email" character varying NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "pk_users__id" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'match with firebase uid'`
    );
    await queryRunner.query(
      `CREATE TABLE "services" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "category_id" integer NOT NULL, "images" text array NOT NULL, "user_id" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "orders_count" integer NOT NULL DEFAULT '0', "rating" integer NOT NULL DEFAULT '0', "reviews_count" integer NOT NULL DEFAULT '0', CONSTRAINT "uc_services__slug" UNIQUE ("slug"), CONSTRAINT "pk_services__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying, CONSTRAINT "uc_categories__slug" UNIQUE ("slug"), CONSTRAINT "pk_categories__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "pk_role_permissions__role_id__permission_id" PRIMARY KEY ("role_id", "permission_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_role_permissions__role_id" ON "role_permissions" ("role_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "idx_role_permissions__permission_id" ON "role_permissions" ("permission_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "orders_features_features" ("orders_id" integer NOT NULL, "features_id" integer NOT NULL, CONSTRAINT "pk_orders_features_features__orders_id__features_id" PRIMARY KEY ("orders_id", "features_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_orders_features_features__orders_id" ON "orders_features_features" ("orders_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "idx_orders_features_features__features_id" ON "orders_features_features" ("features_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "job_posts_tags_tags" ("job_posts_id" integer NOT NULL, "tags_id" integer NOT NULL, CONSTRAINT "pk_job_posts_tags_tags__job_posts_id__tags_id" PRIMARY KEY ("job_posts_id", "tags_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_job_posts_tags_tags__job_posts_id" ON "job_posts_tags_tags" ("job_posts_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "idx_job_posts_tags_tags__tags_id" ON "job_posts_tags_tags" ("tags_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("user_id" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "pk_user_roles__user_id__role_id" PRIMARY KEY ("user_id", "role_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_roles__user_id" ON "user_roles" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_roles__role_id" ON "user_roles" ("role_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "services_tags_tags" ("services_id" integer NOT NULL, "tags_id" integer NOT NULL, CONSTRAINT "pk_services_tags_tags__services_id__tags_id" PRIMARY KEY ("services_id", "tags_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_services_tags_tags__services_id" ON "services_tags_tags" ("services_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "idx_services_tags_tags__tags_id" ON "services_tags_tags" ("tags_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "fk_permissions__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "fk_permissions__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "fk_roles__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "fk_roles__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "fk_sessions__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "fk_sessions__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "uploads" ADD CONSTRAINT "fk_uploads__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "uploads" ADD CONSTRAINT "fk_uploads__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "uploads" ADD CONSTRAINT "fk_uploads__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "packages" ADD CONSTRAINT "fk_packages__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "packages" ADD CONSTRAINT "fk_packages__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "packages" ADD CONSTRAINT "fk_packages__services__service_id" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "fk_features__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "fk_features__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "fk_features__services__service_id" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__users__client_id" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__users__freelancer_id" FOREIGN KEY ("freelancer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__job_posts__job_post_id" FOREIGN KEY ("job_post_id") REFERENCES "job_posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__services__service_id" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders__packages__package_id" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "fk_companies__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "fk_companies__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "fk_companies__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "levels" ADD CONSTRAINT "fk_levels__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "levels" ADD CONSTRAINT "fk_levels__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" ADD CONSTRAINT "fk_job_types__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" ADD CONSTRAINT "fk_job_types__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "currencies" ADD CONSTRAINT "fk_currencies__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "currencies" ADD CONSTRAINT "fk_currencies__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_types" ADD CONSTRAINT "fk_payment_types__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_types" ADD CONSTRAINT "fk_payment_types__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "fk_locations__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "fk_locations__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__companies__company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__levels__level_id" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__job_types__job_type_id" FOREIGN KEY ("job_type_id") REFERENCES "job_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__currencies__currency_id" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__locations__location_id" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__payment_types__payment_type_id" FOREIGN KEY ("payment_type_id") REFERENCES "payment_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "fk_tags__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "fk_tags__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" ADD CONSTRAINT "fk_job_posts__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" ADD CONSTRAINT "fk_job_posts__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" ADD CONSTRAINT "fk_job_posts__categories__category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" ADD CONSTRAINT "fk_job_posts__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" ADD CONSTRAINT "fk_job_posts__users__claimed_by_id" FOREIGN KEY ("claimed_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "fk_messages__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "fk_messages__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "fk_messages__users__author_id" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "fk_messages__users__recipient_id" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews__users__rated_by_id" FOREIGN KEY ("rated_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews__services__service_id" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_users__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_users__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "fk_services__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "fk_services__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "fk_services__categories__category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "fk_services__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "fk_categories__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "fk_categories__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "fk_role_permissions__roles__role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "fk_role_permissions__permissions__permission_id" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_features_features" ADD CONSTRAINT "fk_orders_features_features__orders__orders_id" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_features_features" ADD CONSTRAINT "fk_orders_features_features__features__features_id" FOREIGN KEY ("features_id") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts_tags_tags" ADD CONSTRAINT "fk_job_posts_tags_tags__job_posts__job_posts_id" FOREIGN KEY ("job_posts_id") REFERENCES "job_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts_tags_tags" ADD CONSTRAINT "fk_job_posts_tags_tags__tags__tags_id" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "fk_user_roles__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "fk_user_roles__roles__role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "services_tags_tags" ADD CONSTRAINT "fk_services_tags_tags__services__services_id" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "services_tags_tags" ADD CONSTRAINT "fk_services_tags_tags__tags__tags_id" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services_tags_tags" DROP CONSTRAINT "fk_services_tags_tags__tags__tags_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "services_tags_tags" DROP CONSTRAINT "fk_services_tags_tags__services__services_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "fk_user_roles__roles__role_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "fk_user_roles__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts_tags_tags" DROP CONSTRAINT "fk_job_posts_tags_tags__tags__tags_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts_tags_tags" DROP CONSTRAINT "fk_job_posts_tags_tags__job_posts__job_posts_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_features_features" DROP CONSTRAINT "fk_orders_features_features__features__features_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_features_features" DROP CONSTRAINT "fk_orders_features_features__orders__orders_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions__permissions__permission_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions__roles__role_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "fk_categories__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "fk_categories__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "fk_services__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "fk_services__categories__category_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "fk_services__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "fk_services__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "fk_users__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "fk_users__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews__services__service_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews__users__rated_by_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "fk_messages__users__recipient_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "fk_messages__users__author_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "fk_messages__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "fk_messages__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" DROP CONSTRAINT "fk_job_posts__users__claimed_by_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" DROP CONSTRAINT "fk_job_posts__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" DROP CONSTRAINT "fk_job_posts__categories__category_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" DROP CONSTRAINT "fk_job_posts__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_posts" DROP CONSTRAINT "fk_job_posts__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "fk_tags__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "fk_tags__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__payment_types__payment_type_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__locations__location_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__currencies__currency_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__job_types__job_type_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__levels__level_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__companies__company_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "fk_locations__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "fk_locations__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_types" DROP CONSTRAINT "fk_payment_types__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_types" DROP CONSTRAINT "fk_payment_types__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "currencies" DROP CONSTRAINT "fk_currencies__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "currencies" DROP CONSTRAINT "fk_currencies__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" DROP CONSTRAINT "fk_job_types__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" DROP CONSTRAINT "fk_job_types__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "levels" DROP CONSTRAINT "fk_levels__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "levels" DROP CONSTRAINT "fk_levels__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "fk_companies__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "fk_companies__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "fk_companies__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__packages__package_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__services__service_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__job_posts__job_post_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__users__freelancer_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__users__client_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "features" DROP CONSTRAINT "fk_features__services__service_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "features" DROP CONSTRAINT "fk_features__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "features" DROP CONSTRAINT "fk_features__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "packages" DROP CONSTRAINT "fk_packages__services__service_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "packages" DROP CONSTRAINT "fk_packages__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "packages" DROP CONSTRAINT "fk_packages__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "uploads" DROP CONSTRAINT "fk_uploads__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "uploads" DROP CONSTRAINT "fk_uploads__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "uploads" DROP CONSTRAINT "fk_uploads__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "fk_sessions__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "fk_sessions__users__updated_by_user_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "fk_roles__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "fk_roles__users__created_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "fk_permissions__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "fk_permissions__users__created_by_user_id"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_services_tags_tags__tags_id"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_services_tags_tags__services_id"`
    );
    await queryRunner.query(`DROP TABLE "services_tags_tags"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_roles__role_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_roles__user_id"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_job_posts_tags_tags__tags_id"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_job_posts_tags_tags__job_posts_id"`
    );
    await queryRunner.query(`DROP TABLE "job_posts_tags_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_orders_features_features__features_id"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_orders_features_features__orders_id"`
    );
    await queryRunner.query(`DROP TABLE "orders_features_features"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_role_permissions__permission_id"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_role_permissions__role_id"`
    );
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "job_posts"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "payment_types"`);
    await queryRunner.query(`DROP TABLE "currencies"`);
    await queryRunner.query(`DROP TABLE "job_types"`);
    await queryRunner.query(`DROP TABLE "levels"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "features"`);
    await queryRunner.query(`DROP TABLE "packages"`);
    await queryRunner.query(`DROP TABLE "uploads"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TYPE "public"."entity_state_enum"`);
  }
}
