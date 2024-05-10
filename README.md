## Reproduction Steps

1. `yarn install`
2. `NEXT_PUBLIC_STATSIG_CLIENT_KEY=<client token here> STATSIG_SERVER_SECRET=<server token here> yarn dev`
3. Visit `http://localhost:3000/` in your browser.
4. See html mismatch error `Warning: Expected server HTML to contain a matching text node for "natural_cycles_eyebrow_message_v2" in <p>.`
