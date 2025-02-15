import discord
from discord.ext import commands
import os

# Replace with your bot token
TOKEN = "MTM0MDIwNTc5OTYyODA4MzIzMg.Gcq-e0.fovkrWVVXSkvGT3DoC5m9SlC7n-lNoSu68yEAY"

# Set up the bot
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

# Event: When the bot is ready
@bot.event
async def on_ready():
    print(f"Bot is ready. Logged in as {bot.user}")

# Command: Handle orders
@bot.command(name="order")
async def order(ctx, service: str, discord_username: str, twitter: str, email: str, comments: str):
    # Send the order details to a specific channel
    channel = bot.get_channel(1340211964013580319)  # Replace with your channel ID
    if channel:
        await channel.send(
            f"**New Order Received!**\n"
            f"Service: {service}\n"
            f"Discord: {discord_username}\n"
            f"Twitter: {twitter}\n"
            f"Email: {email}\n"
            f"Comments: {comments}"
        )
        await ctx.send("Your order has been submitted successfully!")
    else:
        await ctx.send("Error: Could not find the order channel.")

# Run the bot
bot.run(TOKEN)