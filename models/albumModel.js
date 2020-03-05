const db = require("./conn");

class albumModel {
    constructor(id, name, artist, year_released, genre, album_id) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.year_released = year_released;
        this.genre = genre;
        this.album_id = album_id;
    }
    static async getAllAlbums() {
        try {
            const response = await db.any(`SELECT * From album;`);
            return response;
        } catch (error) {
            console.error("ERROR:", error);
        }
    }
    static async getAlbumAndReviewDetails(id) {
        try {
            const response = await db.any(
                "SELECT album.name, album.artist, album.year_released, album.genre, review.name, review.stars, review.review FROM reviews INNER JOIN album ON review.album_id = a.id;"
            );
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
        }
    }
    static async addReviews(name, title, stars, review, reviewer_id, album_id) {
        try {
            const response = await db.one(
                `INSERT INTO reviews (name, title, stars, review, reviewer_id, album_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [name, title, stars, review, reviewer_id, album_id]
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error("ERROR", error);
            return error;
        }
    }
}

module.exports = albumModel;