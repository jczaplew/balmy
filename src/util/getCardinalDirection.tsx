  export default function getCardinalDirection(heading: number) {
    // Principle winds + half-winds defintions via https://en.wikipedia.org/wiki/Points_of_the_compass
    // 22.49deg between each step
    switch(true) {
      case (heading >= 348.76 || heading <= 11.25):
        return 'N'
      case heading >= 11.26 && heading <= 33.75:
        return 'NNE'
      case heading >= 33.76 && heading <= 56.25:
        return 'NE'
      case heading >= 56.26 && heading <= 78.75:
        return 'ENE'
      case heading >= 78.76 && heading <= 101.25:
        return 'E'
      case heading >= 101.26 && heading <= 123.75:
        return 'ESE'
      case heading >= 123.76 && heading <= 146.25:
        return 'SE'
      case heading >= 146.26 && heading <= 168.75:
        return 'SSE'
      case heading >= 168.76 && heading <= 191.25:
        return 'S'
      case heading >= 191.26 && heading <= 213.75:
        return 'SSW'
      case heading >= 213.76 && heading <= 236.25:
        return 'SW'
      case heading >= 236.26 && heading <= 258.75:
        return 'WSW'
      case heading >= 258.76 && heading <= 281.25:
        return 'W'
      case heading >= 281.26 && heading <= 303.75:
        return 'WNW'
      case heading >= 303.76 && heading <= 326.25:
        return 'NW'
      case heading >= 326.26 && heading <= 348.75:
        return 'NNW'
      default:
        return 'N/A'
    }
  }