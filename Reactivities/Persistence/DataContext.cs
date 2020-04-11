﻿using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Value> Values { get; set; }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );

            builder.Entity<UserActivity>(x => x
                .HasKey(ua => new {
                    ua.AppUserId,
                    ua.ActivityId
                })
            );

            builder.Entity<UserActivity>(x => x
                .HasOne(userActivity => userActivity.AppUser)
                .WithMany(user => user.UserActivities)
                .HasForeignKey(userActivity => userActivity.AppUserId)
            );

            builder.Entity<UserActivity>(x => x
                .HasOne(userActivity => userActivity.Activity)
                .WithMany(activity => activity.UserActivities)
                .HasForeignKey(userActivity => userActivity.ActivityId)
            );
        }
    }
}
