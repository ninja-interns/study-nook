package auth

import (
	"time"

<<<<<<< HEAD
	"github.com/alexedwards/scs/postgresstore"
=======
	"github.com/alexedwards/scs/pgxstore"
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
	"github.com/alexedwards/scs/v2"
	initializeDB "main.go/initializedb"
)

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
<<<<<<< HEAD
	SessionManager.Store = postgresstore.New(initializeDB.Db)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
=======
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
}
