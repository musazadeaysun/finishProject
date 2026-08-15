## Checkpoint 1 — React Router ilə Naviqasiya

Bu mərhələdə Task Manager layihəsində React Router istifadə edilərək səhifələrarası naviqasiya sistemi qurulmuşdur.

### Görülən işlər

* React Router DOM layihəyə əlavə edildi.
* Ana səhifə (`/`) yaradıldı.
* Login səhifəsi (`/login`) yaradıldı.
* Dashboard səhifəsi (`/dashboard`) yaradıldı.
* Mövcud olmayan səhifələr üçün 404 səhifəsi yaradıldı.
* Navbar komponenti yaradılaraq səhifələr arasında naviqasiya təmin edildi.
* `ProtectedRoute` komponenti yaradıldı.
* Dashboard qorunan route olaraq təyin edildi.
* Autentifikasiya olunmamış istifadəçi Dashboard-a daxil olmaq istədikdə Login səhifəsinə yönləndirilir.
* `Navigate` və `Link` komponentlərindən istifadə edildi.
* `localStorage` vasitəsilə ilkin mock authentication yoxlaması həyata keçirildi.


### Protected Route məntiqi

İstifadəçi `/dashboard` səhifəsinə daxil olduqda `ProtectedRoute` komponenti `localStorage` daxilində `isAuthenticated` dəyərinin olub-olmadığını yoxlayır.

Əgər istifadəçi autentifikasiya olunmayıbsa, avtomatik olaraq `/login` səhifəsinə yönləndirilir.

Bu mərhələdə istifadə olunan authentication mexanizmi yalnız routing-in işləməsini nümayiş etdirmək üçün hazırlanmış mock mexanizmdir. Növbəti checkpoint-də real mock authentication, token saxlanması, logout və refresh zamanı sessiyanın qorunması əlavə ediləcək.

### İstifadə olunan texnologiyalar

* React
* React Router DOM
* JavaScript
* CSS
* localStorage
## Checkpoint 2 — Autentifikasiya Axını

Bu mərhələdə Task Manager layihəsinə tam mock autentifikasiya axını əlavə edilmişdir.

### Görülən işlər

* Login formu yaradıldı.
* Email və şifrə ilə mock istifadəçi yoxlaması həyata keçirildi.
* Uğurlu login zamanı mock token yaradıldı.
* Token `localStorage` daxilində saxlanıldı.
* İstifadəçi məlumatları `localStorage` daxilində saxlanıldı.
* `AuthContext` yaradılaraq authentication məlumatlarının tətbiq daxilində idarə olunması təmin edildi.
* Refresh zamanı `localStorage`-dan token və istifadəçi məlumatları bərpa olunur.
* Logout funksiyası əlavə edildi.
* Logout zamanı token və istifadəçi məlumatları `localStorage`-dan silinir.
* Protected Route authentication vəziyyətini yoxlayır.
* Autentifikasiya olunmamış istifadəçi qorunan səhifəyə daxil olduqda Login səhifəsinə yönləndirilir.
* Login zamanı əvvəl daxil olmaq istənilən qorunan route yadda saxlanılır və uğurlu login-dən sonra həmin səhifəyə yönləndirmə edilir.
* Səhv email və ya şifrə zamanı istifadəçiyə xəta mesajı göstərilir.
* Login zamanı loading vəziyyəti əlavə edildi.
* Token silinərək expiration ssenarisi simulyasiya edilə bilir.

### Demo hesab

```text
Email: user@gmail.com
Şifrə: 123456
```

### Authentication məlumatlarının saxlanması

```text
localStorage
├── authToken
└── authUser
```

### Authentication axını

```text
Login Form
    ↓
AuthContext
    ↓
authService
    ↓
Mock user yoxlaması
    ↓
Token yaradılır
    ↓
localStorage
    ↓
Dashboard
```

### Refresh zamanı

```text
Browser refresh
      ↓
AuthProvider
      ↓
localStorage yoxlanılır
      ↓
Token + user tapılır
      ↓
Sessiya bərpa olunur
```

### Logout zamanı

```text
Logout
   ↓
authToken silinir
authUser silinir
   ↓
AuthContext state təmizlənir
   ↓
Login səhifəsinə yönləndirilir
```

### Token expiration simulyasiyası

Token `localStorage`-dan silindikdə istifadəçi artıq autentifikasiya olunmuş hesab edilmir. Qorunan route-a yenidən daxil olmaq istədikdə `ProtectedRoute` istifadəçini Login səhifəsinə yönləndirir.

Bu mərhələdə authentication mock API vasitəsilə simulyasiya edilmişdir. Növbəti mərhələdə qlobal state və daha sonra mock API üzərindən CRUD əməliyyatları əlavə ediləcək.
