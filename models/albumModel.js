const db = require('./conn');

class albumModel {
    constructor(id, name, artist, year_released, genre) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.year_released = year_released;
        this.genre = genre;
    }

    static async getAllAlbums() {
        try {
            const response = await db.any(`SELECT * From album;`)
            console.log(response)
            return response;
        } catch (error) {
            console.error("ERROR:", error);
        }
    }

    static async getAlbumAndReviewDetails(id) {
        try {
            const response = await db.any('SELECT a.name, a.artist, a.year_released, a.genre, re.name, re.stars, re.review FROM reviews re INNER JOIN album a ON re.album_id = a.id;')
            console.log(response)
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
        }
    }

}



module.exports = albumModel;