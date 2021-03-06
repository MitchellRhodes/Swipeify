import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyApiService } from '../spotify-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  query: string | null = null;
  selectedSearchValue: string | null = null;
  searchResults: any;

  constructor(private route: ActivatedRoute, 
    private spotifyApi: SpotifyApiService, ) { }

    async ngOnInit(): Promise<void> {
  
    }
}
