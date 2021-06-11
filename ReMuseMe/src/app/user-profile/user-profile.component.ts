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


  constructor(private route: ActivatedRoute, 
    private spotifyApi: SpotifyApiService,
    private trackslikeddislikedService: TracksLikedDislikedService,
    private databaseService: DatabaseService) { }

  //This is how we are getting any of the users spotify profile information

   async ngOnInit(): Promise<void> {
     (await this.spotifyApi.getUserProfile()).subscribe(async (response: any) => {
       this.userProfile = response;
       console.log(response);
     });

     this.likedTracks = this.trackslikeddislikedService.returnSelectedTracks();
     console.log(this.likedTracks);
  }


  

}
