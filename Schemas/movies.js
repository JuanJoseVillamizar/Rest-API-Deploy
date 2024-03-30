const z = require('zod')
const movieSchema = z.object({
  title: z.string({
    invalid_type_errorMessage: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Crime']), {
    required_error: 'Movie genre is required.',
    invalid_type_error: 'Movie genre must be an array of enum genre'
  }),
  year: z.number().int().positive().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  rate: z.number().min(0).max(10).default(5)
})

function validateMovie (input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = { validateMovie, validatePartialMovie }
