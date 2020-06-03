import { Component } from '@angular/core';

/* Credit goes to Tobias Ahlin [spinkit] && https://tobiasahlin.com/spinkit/ */

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  `,
  styles: [
    `
      .spinner {
        width: 80px;
        height: 80px;
        position: relative;
        margin: 100px auto;
      }

      .double-bounce1,
      .double-bounce2 {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        position: absolute;
        border-radius: 50%;
        background-color: #ffffff;
        animation: sk-bounce 2s infinite ease-in-out;
        -webkit-animation: sk-bounce 2s infinite ease-in-out;
      }

      .double-bounce2 {
        animation-delay: -1s;
        -webkit-animation-delay: -1s;
      }

      @-webkit-keyframes sk-bounce {
        0%,
        100% {
          -webkit-transform: scale(0);
        }
        50% {
          -webkit-transform: scale(1);
        }
      }

      @keyframes sk-bounce {
        0%,
        100% {
          transform: scale(0);
          -webkit-transform: scale(0);
        }
        50% {
          transform: scale(1);
          -webkit-transform: scale(1);
        }
      }
    `,
  ],
})
export class SpinnerComponent {}
