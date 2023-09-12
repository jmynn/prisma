BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Posts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Posts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [login] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [externalId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_login_key] UNIQUE NONCLUSTERED ([login]),
    CONSTRAINT [Users_password_key] UNIQUE NONCLUSTERED ([password]),
    CONSTRAINT [Users_externalId_key] UNIQUE NONCLUSTERED ([externalId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Posts] ADD CONSTRAINT [Posts_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([externalId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
