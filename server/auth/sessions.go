package auth

import (
	"time"

<<<<<<< HEAD
	"github.com/alexedwards/scs/postgresstore"
=======
	initializeDB "studynook.go/initializedb"

	"github.com/alexedwards/scs/pgxstore"
>>>>>>> 0baeca8d898cab22081a9742beaa65ef1dd25a85
	"github.com/alexedwards/scs/v2"
)

/**        <Typography variant="body1">
            Don't have an account? "<Link to="./register">Register here</Link>
        </Typography>
**/

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = postgresstore.New(initializeDB.Db)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
}
