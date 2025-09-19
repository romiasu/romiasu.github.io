{
  "frame": {
    "width": 128,
    "height": 256,
    "cols": 6,
    "rows": 1
  },

  "animations": {
    "fire1": {
      "frames": [0, 1, 2],
      "next": "fire2",
      "frequency": 2
    },

    "fire2": {
      "frames": [3, 4, 5],
      "next": "fire2",
      "frequency": 2
    }
  }
}
