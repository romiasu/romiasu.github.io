{
  "frame": {
    "width": 64,
    "height": 64,
    "cols": 5,
    "rows": 1
  },

  "animations": {
    "upstate": {
      "frames": [4],
      "next": "upstate",
      "frequency": 30
    },

    "downstate": {
      "frames": [0],
      "next": "downstate",
      "frequency": 30
    },

    "upmotion": {
      "frames": [0, 1, 2, 3, 4],
      "next": "upstate",
      "frequency": 1
    },

    "downmotion": {
      "frames": [4, 3, 2, 1, 0],
      "next": "downstate",
      "frequency": 1
    }
  }
}
