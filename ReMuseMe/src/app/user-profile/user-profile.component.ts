import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyApiService } from '../spotify-api.service';
import { Profile } from '../Interfaces/profile'
import { TracksLikedDislikedService } from '../Services/tracks-liked-disliked.service';
import { Tracks } from '../Interfaces/tracks';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: Profile | null = null;

  likedTracks: Tracks[] = [];

  track: Tracks | null = null;
  trackArray: Tracks[] = [];
  currentIndex: number = 0;
  songIdArray: string[] = [];
  selectedTrack: Tracks[] = [];

  userStats: any;

  seedTracks: any;

  randomStatName1: any;
  randomValue1: any;
  randomStatName2: any;
  randomValue2: any;

  constructor(private route: ActivatedRoute,
    private spotifyApi: SpotifyApiService,
    private trackslikeddislikedService: TracksLikedDislikedService,
    private databaseService: DatabaseService) { }

  //This is how we are getting any of the users spotify profile information

  async ngOnInit(): Promise<void> {

    this.getTracksFromLocalStorage();

    this.getUserStats();


  };


  async getTracksFromLocalStorage() {
    (await this.spotifyApi.getUserProfile()).subscribe(async (response: any) => {
      this.userProfile = response;
    });

    this.likedTracks = this.trackslikeddislikedService.returnSelectedTracks();
    console.log(this.likedTracks);
  }


  //get user stats used in oninit and get recommendations
  async getUserStats() {
    (await this.spotifyApi.getUserProfile()).subscribe(async (response: any) => {

      let userEmail = response.email;


      //backend call for user to get id, grab track string id from local storage 
      (await this.databaseService.getUser(userEmail)).subscribe(async (user: any) => {

        return (await this.databaseService.getUserStats(user.id)).subscribe(async (stats: any) => {
          this.userStats = stats
          this.getRecommendations();
        })
      })
    });
  }


  async getRecommendations() {

    this.getTracksFromLocalStorage(); //grab track ids and use in url

    this.seedTracks = this.trackslikeddislikedService.returnSelectedTracks();


    let randomTrack1 = this.seedTracks[this.seedTracks.length * Math.random() | 0];

    let randomTrack2 = this.seedTracks[this.seedTracks.length * Math.random() | 0];


    let randomStat1 = this.randomProperty1(this.userStats);

    let randomStat2 = this.randomProperty2(this.userStats);


    //this is so we do not get user id or the same random stat
    if (this.randomStatName2 === this.randomStatName1) {
      randomStat2 = this.randomProperty2(this.userStats);
    } else if (this.randomValue1 >= 1) {
      randomStat1 = this.randomProperty1(this.userStats);
    } else if (this.randomValue2 >= 1) {
      randomStat2 = this.randomProperty2(this.userStats);
    }

    console.log(this.randomValue1, this.randomValue2)


    return this.spotifyApi.getRecommendations(randomTrack1.id, randomTrack2.id, this.randomValue1, this.randomValue2, this.randomStatName1, this.randomStatName2);
  }

  randomProperty1(object: any) {
    let stats = Object.keys(object);
    let random = Math.floor(Math.random() * (stats.length));
    this.randomStatName1 = stats[random];
    this.randomValue1 = object[stats[random]];

  }

  randomProperty2(object: any) {
    let stats = Object.keys(object);
    let random = Math.floor(Math.random() * (stats.length));
    this.randomStatName2 = stats[random];
    this.randomValue2 = object[stats[random]];

  }
}



// getRecommended  code that will be reworked for finished product - ami

    //Getting selected categories from service and then creating seed


    // this.selectedCategories = this.categorySelectedService.returnSelectedCategories();
    // let seed = '';
    // this.selectedCategories.forEach((category: any, index: any) => {
    //   if (index > 0){
    //     seed = ${seed},${category.id};
    //   } else {
    //     seed = category.id
    //   }
    // });

    // // console.log(seed);

    // //Passing Seed to get recommendations from spotify api service
    // (await this.spotifyApi.getRecommendations(seed)).subscribe((response: any) => {
    //   //console.log(response)
    //   //Not using yet
    //   this.recommended = response


    //   //Selecting a random track from response to play
    //   let trackToPlayIndex = (Math.floor(Math.random() * response.tracks.length) + 1) - 1
    //   this.track = response.tracks[trackToPlayIndex];
    // });

