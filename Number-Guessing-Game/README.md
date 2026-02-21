# Number Guessing Game CLI

A simple command‑line tool to play a number guessing game.

[Project URL](https://roadmap.sh/projects/number-guessing-game)


## 🚀 Features

-   Displays welcome message along with rules of the game
-   Generates random number between 1 and 100
-   Allows user to select difficulty level

## 🚀 Additional features
-   Has timer to track time taken to guess
-   Allows the user to continue playing or quit
-   Tracka users high score (i.e., the fewest number of attempts it took to guess the number under a specific difficulty level).
<!-- - Has a hint system -->

------------------------------------------------------------------------
------------------------------------------------------------------------

## ⚙️ Installation

Clone the project:

``` bash
git clone https://github.com/eva003n/Number-Guessing-Game.git
```

Link the CLI globally (so you can run `guess-number` anywhere):

``` bash
pnpm link
```


> If PNPM complains about a bin folder, run:
>
> ``` bash
> pnpm setup
> ```

Confirm setup was successfull, will output absolute path to directory

```bash
pnpm bin -g
```
------------------------------------------------------------------------

## 🧾 Usage

### Intialize game
```bash
$ guess-number
```

