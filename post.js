app.post('/news', async (req, res) => {
  try {
    const { news_title, news_date, display_order } = req.body;

    const connection = await oracledb.getConnection({
      user: 'paafweb',
      password: 'paafweb123',
      connectString: '192.168.0.139:1521/PAAFTSTPDB'
    });

    const result = await connection.execute(
      `INSERT INTO news_table (id, news_title, news_date, display_order) VALUES (:1, :2, :3, :4)`,
      [id, news_title, news_date, display_order]
    );

    await connection.commit();
    await connection.close();

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
