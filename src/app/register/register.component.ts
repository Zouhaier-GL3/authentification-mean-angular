import { Component } from "@angular/core";
import { AuthenticationService,  } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  credentials: any = {
    email: "",
    name: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
}
