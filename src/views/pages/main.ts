import $ from "jquery";
import { from } from "rxjs";
// import { map } from "rxjs/operators";

const numbers = [33, 44, 55, 66, 77];

const numbers$ = from(numbers);
numbers$.subscribe(console.log);

$(document).ready(rxjs);

function rxjs() {}
