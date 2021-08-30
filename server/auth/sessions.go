package auth

import (
	"time"

	"github.com/alexedwards/scs/postgresstore"
	"github.com/alexedwards/scs/v2"
	initializeDB "main.go/initializedb"
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
