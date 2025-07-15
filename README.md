# Web Development Project 5 - PokéDash

Submitted by: **Hai Hoang**

This web app: **displays a themed dashboard of Pokémon using data from the PokéAPI. Users can view stats, search Pokémon by name, and filter them by type. The design is styled with a retro Pokémon theme for a fun and nostalgic user experience.**

Time spent: **6 hours spent in total**

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays 50 unique Pokémon, one per row (in grid format)
  - Each row shows at least two features: name, sprite image, and type
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app displays:
    - Total number of Pokémon fetched
    - Average HP
    - Average Attack
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar correctly filters Pokémon by name
  - The list dynamically updates as the user types
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter allows users to choose Pokémon by type (e.g., fire, water)
  - The list correctly updates based on the selected type

The following **optional** features are implemented:

- [ ] Multiple filters can be applied simultaneously
- [ ] Filters use different input types
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Themed UI based on the Pokémon franchise (retro fonts, colors, and backgrounds)
* [x] Hover animations on Pokémon cards
* [x] Responsive layout for various screen sizes

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./pokemon-dashboard.mp4' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ezgif

## Notes

Describe any challenges encountered while building the app.

- Fetching individual Pokémon data in parallel using `Promise.all` was tricky to set up efficiently.
- Designing the layout that looks good.
- Creating clean filter/search logic that didn’t conflict.

## License

    Copyright 2025 Hai Hoang

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.