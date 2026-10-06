CREATE TABLE `login_attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`attempts` integer NOT NULL,
	`window` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `story` (
	`id` integer PRIMARY KEY NOT NULL,
	`revision` integer NOT NULL,
	`content` text NOT NULL,
	`updated_at` text NOT NULL
);
