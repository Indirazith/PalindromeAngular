import { Component, OnInit, HostListener } from '@angular/core';
import { PalindromeServiceService } from './palindrome-service.service';
import { PalindromeData } from '../shared/model/PalindromeData.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //variables used
  title = 'PalindromeAngular';
  values: PalindromeData[] = [];
  isPalindrom: boolean = false;
  hidden: boolean = false;
  errorMessage: string = "";
  n: number = 0;
  sort: boolean = false;
  submitButtonDisable: boolean = true;
  hideLoadMore: boolean = false;
  successMessageBoolean: boolean = true;


  constructor(private palindromeService: PalindromeServiceService) { }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.palindromeService.setLimit().subscribe();
  }

  ngOnInit(): void {
    this.palindromeService.getData().subscribe(data => {
      this.values = data;
      console.log(data);
    });

  }

  //method to sort the table data in ascending order
  sortAsc(value: any) {
    this.values = this.values.sort(this.sortAscend);
  }

  //method to sort the table in descinding order
  sortDes(value: any) {
    this.values = this.values.sort(this.sortDescend);
  }

  sortAscend(a: any, b: any) {
    return a.palindrome.localeCompare(b.palindrome);
  }

  sortDescend(a: any, b: any) {
    return b.palindrome.localeCompare(a.palindrome);
  }

  //used to load the data
  loadData() {
    this.palindromeService.getData().subscribe(data => {
      this.values = data;
    });
  }

  //used to perform lazyload 
  loadMoreData() {
    this.palindromeService.getData().subscribe(data => {
      let x = Object.keys(data).length == 0;
      this.hideLoadMore = x;
      data.forEach((sampleData: PalindromeData) => {
        this.values.push(sampleData);
      });
    });
  }

  //logic to check the input value
  checkForValidation(palindromeInput: string) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
    if (format.test(palindromeInput)) {
      this.submitButtonDisable = true;
      this.errorMessage = "The input contains special character's please remove them !";
      this.hidden = true;
    } else {
      this.submitButtonDisable = false;
      this.hidden = false;
    } if (palindromeInput === "")
      this.submitButtonDisable = true;
  }

  //logic for sort operation
  performSort() {
    this.sort = !this.sort;
    if (this.sort)
      this.sortAsc(this.values);
    else
      this.sortDes(this.values);

  }

  //check for palindrome and to insert the value
  checkAndInsert(value: string) {
    let x = this.values.find(e => e.palindrome);
    console.log(x?.palindrome);
    let comparision = (x?.palindrome.localeCompare(value.toLocaleLowerCase()));
    if (comparision == 0) {
      console.log("alraedy in list")
      this.errorMessage = "The input is already present in the list";
      this.hidden = true;
    } else {
      this.hidden = false;
      this.palindromeService.checkForPalindrome(value).subscribe(data => {
        this.isPalindrom = data;
        if (this.isPalindrom == true) {
          this.palindromeService.insert(value);
          this.successMessageBoolean = false;
          setTimeout(() => {
            this.successMessageBoolean = true;
          }, 2000);
          this.loadData();
          (<HTMLFormElement>document.getElementById("palindromeForm")).reset();
          this.palindromeService.setLimit().subscribe();
        }
        else {
          this.errorMessage = "The input is not a palindrome";
          this.hidden = true;
        }
      });
    }
  }
}
