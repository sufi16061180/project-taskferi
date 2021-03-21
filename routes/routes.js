const authRoutes = require('./authRoutes');
const profileRoute = require('./profileRoute');
const sellerprofileRoute = require('./sellerprofileRoute');
const uploadRoute = require('./uploadRoutes')
const gigRoute = require('./gigRoute')
const servicesRoute= require('./servicesRoute')



const routes = [

    {

        path: authRoutes,
        handler: authRoutes

    },
    {
        path: '/profile',
        handler: profileRoute
    },
    {
        path: '/sellerprofile',
        handler: sellerprofileRoute
    },
    {
        path: '/uploads',
        handler: uploadRoute
    },
    {

        path: '/gigs',
        handler: gigRoute
    },
    {
        path: '/services',
        handler: servicesRoute
    },
    {
        path: '/',
        handler: (req, res)=>
        {
        
            res.render('./index', {title: 'Welcome to TaskFeri'});
        }
    }


]

module.exports = app =>
{
    routes.forEach(r=>{

        if (r.path === '/')
        {
            app.get(r.path, r.handler)
        }else
        {
            
            app.use(r.path, r.handler)
        }

    })

}