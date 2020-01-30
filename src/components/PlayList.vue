<template>
  <div class="hello">
    <table>
      <tr>
        <th>曲名</th>
        <th>アーティスト</th>
        <th>リリース日</th>
      </tr>
      <tr v-for="item in items" v-bind:key="item.songId">
        <td>{{ item.songTitle }}</td>
        <td>{{ item.artistName }}</td>
        <td>{{ item.releaseDate }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import apiKicker from "../ApiKicker";
import Item from "../SpotifyInterface";

@Component
export default class PlayList extends Vue {
  /** props */
  @Prop()
  private songId!: string;
  private songTitle!: string;
  private artistName!: string;
  private releaseDate!: string;

  // data
  items: { [key: string]: string }[] = [
    {
      songId: this.songId,
      songTitle: this.songTitle,
      artistName: this.artistName,
      releaseDate: this.releaseDate
    }
  ];

  async created() {
    const apikicker = new apiKicker(
      API_BASE + "playlists/7nC944M9XwCfzgSduxhAnx/tracks",
      "M2MwOGZiZDA3ZmExNDkxNjhiOGUxMDNlNjM1Njk4Mjc6MWY3MTEwNmFmMjQ5NGY1ZmFlOTc0N2NmMGI1MDZhZjI="
    );
    let apiResults: Item[] = [];
    await apikicker.apiKicker().then(results => {
      apiResults = results;
    });
    console.log("中身");
    console.log(apiResults);
    apiResults.forEach(e => {
      this.items.push({
        songId: e.track.id,
        songTitle: e.track.name,
        artistName: e.track.artists[0].name,
        releaseDate: e.track.album.release_date
      });
    });
  }
}

const API_BASE = "https://api.spotify.com/v1/";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
