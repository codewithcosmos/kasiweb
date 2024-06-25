import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
    res.render('home', { title: 'Home' });
});

router.get('/about', (_req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/services', (_req, res) => {
    res.render('services', { title: 'Services' });
});

router.get('/contact', (_req, res) => {
    res.render('contact', { title: 'Contact' });
});

router.get('/blog', (_req, res) => {
    res.render('blog', { title: 'Blog' });
});

export default router;
