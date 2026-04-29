# CS208 14.01 Final Project

- Name: Summer Radkiewicz
- GitHub: [https://github.com/summerradkiewicz] (https://github.com/summerradkiewicz)
- Term: Spring 2026

## Project Description

This is a mock-up website for a business called Downtown Donuts, featuring
a landing page, menu, about us page, and a page to leave comments.


## Setup

## Install the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running. You
only need to run this script once per Codespace.

```bash
./setup_scripts/install_db.sh
```

Answer these for any question prompts:
- Switch to unix_socket authentication [Y/n] n
- Change the root password? [Y/n] Y
  - Set the password to 12345
- Remove anonymous users? [Y/n] Y
- Disallow root login remotely? [Y/n] Y
- Remove test database and access to it? [Y/n] Y
- Reload privilege tables now? [Y/n] Y

## Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, you can access the application by forwarding port 3000. Open the
forwarded port in your browser to view the application.


## Design Decisions

- One design choice was to add one more color from the client brief's color palette, a slightly paler
version of the saffron color. I did this because I really had no idea how to make the colors work,
and I assume(?) having a slight variation in shades is acceptable. If it isn't, then it's not that
hard to change back in any case.
- Another element was giving the landing page sliding image visuals. I didn't have a whole lot of
time to smooth it out, there's a 50% change the top 2 images appear under the text for you and I'm
not sure exactly what's doing that. Either way, the animated visuals are meant to grab attention.
- Comments appear from most recent at the top to oldest at the bottom. I think this lines up
with how most comment sections are on websites, the one caveat being that thay don't reload the page
when you load more. Since the comment code is repurposed from the previous assignment, I got rid
of ways you can edit comments (I imagine being able to delete other comments doesn't make sense?).

## Edge Cases

1) What happens if the server/API is unreachable? (The UI should display a friendly message, not break.)
    - it should state the error on the page (replacing the comments section)
2) What happens if a user submits a comment with only whitespace?
    - it should redirect the user to the page with an error message stating 
    that the comment can't be empty
3) What happens if a user submits extremely long input (e.g., 10,000 characters)?
    - it should redirect the user to the page with an error message stating 
    that it has to be under the character limit
4) What happens if the user rapidly double-clicks the submit button?
    - it only submits it once by hiding the button until the page redirects


## Challenges/Learning

- Getting the timestamps on the comments to be decent enough took a bit. Everything related to 
the comments, actually. For the timestamps though, I didn't realize at first that just editing
the table's file in the repository wasn't sufficient to update the table (don't know why it
didn't dawn on me). When I did properly alter the database's table to have a column for timestamps,
the next issue was to get it in a format that made sense for a comment. Originally I used SQL's
current date, but it gives a super lengthy and specific timestamp that didn't look good. Working through
it with help from AI I landed on converting the UNIX timestamp to get the date something was posted.
- Similarly, the load more feature and sanitization/validation were challenging for me. I don't think
I found a good enough solution for those either yet. Specifically for the lazy loading, I thought I 
would be able to mostly figure it out by myself, but ran into a lot of issues with loading/preventing
comments from loading and the page reloading. I think everything related to back-end server stuff
in general is a point of challenge for me.

## Citations

- https://quentin-bellanger.com/blog/keyboard-navigation/
- mdn web docs
- stack overflow
- Copilot
- ChatGPT - image generation
- (image source) https://www.123rf.com/photo_27104665_cheerful-guy-pointing-towards-camera.html
- (image source) https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.thrillist.com%2Feat%2Fnation%2Fdisgusting-donuts&ved=0CBkQjhxqFwoTCPjwlP78jpQDFQAAAAAdAAAAABAe&opi=89978449
- (image source) https://en.wikipedia.org/wiki/Boulevard_du_Temple_%28photograph%29

