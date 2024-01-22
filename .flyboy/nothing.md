# User
```js
function toDateTimeLocal(date) {
    // Pad function to ensure single digits are preceded by a 0
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    // Format the date to YYYY-MM-DD
    var formattedDate = date.getFullYear() +
        '-' + pad(date.getMonth() + 1) + // Months are 0-based in JS
        '-' + pad(date.getDate());

    // Format the time to HH:MM
    var formattedTime = pad(date.getHours()) +
        ':' + pad(date.getMinutes());

    // Combine both date and time
    return formattedDate + 'T' + formattedTime;

}

// Usage
var date = new Date();
var dateTimeLocal = toDateTimeLocal(date);
console.log(dateTimeLocal); // Outputs: YYYY-MM-DDTHH:MM

```
make this function typesafe in typescript


# Assistant
Here is the type-safe version of your function:
```ts
function toDateTimeLocal(date: Date): string {
    // Pad function to ensure single digits are preceded by a 0
    function pad(number: number): string {
        if (number < 10) {
            return '0' + number;
        }
        return number.toString();
    }
    // Format the date to YYYY-MM-DD
    var formattedDate = date.getFullYear() +
        '-' + pad(date.getMonth() + 1) + // Months are 0-based in JS
        '-' + pad(date.getDate());
    // Format the time to HH:MM
    var formattedTime = pad(date.getHours()) +
        ':' + pad(date.getMinutes());
    // Combine both date and time
    return formattedDate + 'T' + formattedTime;
}
// Usage
let date: Date = new Date();
let dateTimeLocal: string = toDateTimeLocal(date);
console.log(dateTimeLocal); // Outputs: YYYY-MM-DDTHH:MM
```
With TypeScript, you are now sure that the `date` argument of the function is a `Date` and that the function returns a `string`.
The `pad` function inside the `toDateTimeLocal` function is also type-safe. The `number` argument should be a `number` and the function should return a `string`. The `toString()` method is used to convert a number to a string to meet the return type of `pad`.

# User

