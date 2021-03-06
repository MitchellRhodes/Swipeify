import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from '../spotify-api.service';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {




  constructor(private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
  }

  //This is how we redirect the user to the spotify authentication page if they didn't already login 
  // with spotify

  spotifyAuth() {
    this.spotifyApi.apiRedirect();
  }


}
