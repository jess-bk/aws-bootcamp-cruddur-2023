from lib.db import db

class ReplyToActivityUuidToStringMigration:
    @staticmethod
    def migrate_sql():
        data = """
        ALTER TABLE activities
        ALTER COLUMN reply_to_activity_uuid TYPE uuid USING reply_to_activity_uuid::text::uuid;
        """
        return data

    @staticmethod
    def rollback_sql():
        data = """
        ALTER TABLE activities
        ALTER COLUMN reply_to_activity_uuid TYPE integer USING NULLIF(reply_to_activity_uuid::uuid::text, '')::integer;
        """
        return data

    @staticmethod
    def migrate():
        db.query_commit(ReplyToActivityUuidToStringMigration.migrate_sql(), {})

    @staticmethod
    def rollback():
        db.query_commit(ReplyToActivityUuidToStringMigration.rollback_sql(), {})

migration = ReplyToActivityUuidToStringMigration
