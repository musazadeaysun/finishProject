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
