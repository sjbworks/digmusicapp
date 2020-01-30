import axios from "axios";
import Item from "./SpotifyInterface";

export default class ApiKicker {
  url: string;
  auth: string;

  constructor(url: string, auth: string) {
    this.url = url;
    this.auth = auth;
  }

  async apiKicker() {
    // : { key: any }[]
    let accessToken;
    let results: Item[] = [];
    const queryString = require("query-string");

    await axios
      .post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({ grant_type: "client_credentials" }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${this.auth}`
          }
        }
      )
      .then(async response => {
        accessToken = response.data.access_token;
        await axios
          .get(this.url, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => {
            // handle success
            results = response.data.items;
            console.log(results);
          })
          .catch(error => {
            // handle error
            results = error;
          });
        // return results;
      })
      .catch(error => {
        console.log(error.response.data.error);
      });

    return results;
  }
}
