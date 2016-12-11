# Macros  

These are all the available display macros for BigDots.io LED displays.

### Twinkle

![Twinkle macro](images/twinkle.gif)

### Config options

```js
{
  color: '#FFFFFF'
}
```

### Marquee

The classic LED panel usecase...

![Marquee macro](images/marquee.gif)

```js
{
  color: '#FFFFFF',
  backgroundColor: '#000000',
  font: 'system-16',
  text: 'Replace with marquee text!',
  speed: 50
}
```

### Programmable

It's all on you. Use the the Node API to do whatever you want!

![Programmable macro](images/programmable.png)

### Counter

Display a sum of an item or items via json from a url. The url should return json in the following structure...

```json
[{ "count": 12540 }]
```

![Counter macro](images/counter.png)

```js
{
  loadingBarColor: '#333333',
  iconColor: '#FFFFFF',
  countColor: '#FFFFFF',
  icon: null,
  url: '',
  refreshInterval: 60
}
```

### Solid Color

![Solid color macro](images/solid-color.png)

```js
{
  color: '#FFFFFF'
}
```

### Image

![Image macro](images/image.png)

GIF friendly!
![Image macro](images/image.gif)

```js
{
  url: '',
  speed: 10 // for GIFs
}
```
