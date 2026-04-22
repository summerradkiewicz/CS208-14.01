var express = require('express');
var router = express.Router();
const xss = require('xss');


/* GET home page and Pug page path. */
router.get(['/', '/comments.pug'], function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      // Convert Unix timestamp to readable date
      results = results.map(row => ({
        ...row,
        formattedDate: new Date(row.submitted * 1000).toLocaleString()
      }));
      const offset = parseInt(req.query.offset) || 0;
      const displayed = results.slice(0, 10 + offset);
      res.render('index', { title: 'Downtown Donuts', todos: displayed, offset: offset, totalCount: results.length });
      // res.render('index', { title: 'Downtown Donuts', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.post('/create', function (req, res, next) {
    let { task } = req.body;
    const MAX_LENGTH = 250;
    task = xss(task.trim()); // Remove scripts/HTML, trim whitespace

    // Validate character limit
    if (!task || task.trim().length === 0) {
      return res.status(400).send('Comment cannot be empty');
    }
    if (task.length > MAX_LENGTH) {
      return res.status(400).send(`Comment exceeds maximum length of ${MAX_LENGTH} characters`);
    }
    
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Comment added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/comments.pug');
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Error adding comment');
    }
});

router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/comments.pug');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});

module.exports = router;