import db from "./_db.js";
import { Resolvers } from "./generated/graphql.js";

export const resolvers: Resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    review(_, args) {
      return db.reviews.find((review) => args.id === review.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      const id = Number(db.games[db.games.length - 1].id) + 1;
      db.games.push({
        id: id.toString(),
        title: args.game.title,
        platform: args.game.platform,
      });
      return db.games[db.games.length - 1];
    },
    editGame(_, args) {
      const game = db.games.find((g) => g.id === args.id);
      if (args.edits.platform) {
        game.platform = args.edits.platform;
      }
      if (args.edits.title) game.title = args.edits.title;
      return game;
    },
  },
};
