-- DropForeignKey
ALTER TABLE "ai_output" DROP CONSTRAINT "ai_output_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ai_output_tag" DROP CONSTRAINT "ai_output_tag_ai_output_id_fkey";

-- DropForeignKey
ALTER TABLE "ai_output_tag" DROP CONSTRAINT "ai_output_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_user_id_fkey";

-- DropForeignKey
ALTER TABLE "article_tag" DROP CONSTRAINT "article_tag_article_id_fkey";

-- DropForeignKey
ALTER TABLE "article_tag" DROP CONSTRAINT "article_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "articles_content" DROP CONSTRAINT "articles_content_article_id_fkey";

-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_message_id_fkey";

-- DropForeignKey
ALTER TABLE "course_tag" DROP CONSTRAINT "course_tag_course_id_fkey";

-- DropForeignKey
ALTER TABLE "course_tag" DROP CONSTRAINT "course_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_created_by_fkey";

-- DropForeignKey
ALTER TABLE "group_tag" DROP CONSTRAINT "group_tag_group_id_fkey";

-- DropForeignKey
ALTER TABLE "group_tag" DROP CONSTRAINT "group_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "group_user" DROP CONSTRAINT "group_user_group_id_fkey";

-- DropForeignKey
ALTER TABLE "group_user" DROP CONSTRAINT "group_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_group_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_user_id_fkey";

-- DropForeignKey
ALTER TABLE "message_ai" DROP CONSTRAINT "message_ai_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "payment_method" DROP CONSTRAINT "payment_method_user_id_fkey";

-- DropForeignKey
ALTER TABLE "plan_benefit" DROP CONSTRAINT "plan_benefit_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_level_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "user_badge" DROP CONSTRAINT "user_badge_badge_id_fkey";

-- DropForeignKey
ALTER TABLE "user_badge" DROP CONSTRAINT "user_badge_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tag" DROP CONSTRAINT "user_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tag" DROP CONSTRAINT "user_tag_user_id_fkey";

-- AddForeignKey
ALTER TABLE "ai_output_tag" ADD CONSTRAINT "ai_output_tag_ai_output_id_fkey" FOREIGN KEY ("ai_output_id") REFERENCES "ai_output"("ai_output_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_output_tag" ADD CONSTRAINT "ai_output_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_output" ADD CONSTRAINT "ai_output_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_tag" ADD CONSTRAINT "article_tag_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("article_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_tag" ADD CONSTRAINT "article_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles_content" ADD CONSTRAINT "articles_content_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("article_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message"("message_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_tag" ADD CONSTRAINT "course_tag_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_tag" ADD CONSTRAINT "course_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_tag" ADD CONSTRAINT "group_tag_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_tag" ADD CONSTRAINT "group_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_user" ADD CONSTRAINT "group_user_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_user" ADD CONSTRAINT "group_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_ai" ADD CONSTRAINT "message_ai_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_method" ADD CONSTRAINT "payment_method_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_benefit" ADD CONSTRAINT "plan_benefit_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("plan_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badge" ADD CONSTRAINT "user_badge_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("badge_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badge" ADD CONSTRAINT "user_badge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tag" ADD CONSTRAINT "user_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tag" ADD CONSTRAINT "user_tag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level"("level_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("plan_id") ON DELETE CASCADE ON UPDATE CASCADE;
