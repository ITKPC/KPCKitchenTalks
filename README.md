# KPC Kitchen Talks

A simple Microsoft 365 learning hub for Kamloops Pickleball Club volunteers, committee members and board members.

## Current features

- Mobile-friendly static site
- KPC colour palette
- Searchable and filterable Kitchen Talks
- Starter lessons for Teams, Outlook, SharePoint and OneDrive
- Curated links to official Microsoft videos and support content
- No database or user sign-in required

## Netlify deployment

1. In Netlify, choose **Add new site** and **Import an existing project**.
2. Connect GitHub and select `ITKPC/KPCKitchenTalks`.
3. Leave the build command blank.
4. Set the publish directory to `.` if Netlify does not detect it automatically.
5. Deploy the site.

Every commit to the main branch will then publish automatically.

## Project files

- `index.html` — page structure
- `styles.css` — visual design and KPC colours
- `app.js` — Kitchen Talk content, search, filters and lesson dialogs
- `netlify.toml` — Netlify configuration

## Next steps

- Replace the temporary KPC logo circle with the official logo image.
- Add KPC screenshots and short screen recordings.
- Confirm wording and sequence of the starter learning path.
- Add more Kitchen Talks as users identify common questions.
