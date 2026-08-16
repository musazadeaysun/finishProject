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


### Token expiration simulyasiyası

Token `localStorage`-dan silindikdə istifadəçi artıq autentifikasiya olunmuş hesab edilmir. Qorunan route-a yenidən daxil olmaq istədikdə `ProtectedRoute` istifadəçini Login səhifəsinə yönləndirir.

Bu mərhələdə authentication mock API vasitəsilə simulyasiya edilmişdir. Növbəti mərhələdə qlobal state və daha sonra mock API üzərindən CRUD əməliyyatları əlavə ediləcək.

## Checkpoint 3 — Qlobal State İdarəetməsi

Bu mərhələdə Task Manager layihəsində qlobal state idarəetməsi üçün **Context API və useReducer** istifadə edilmişdir.

### Görülən işlər

* Task məlumatlarının qlobal state-də saxlanması təmin edildi.
* `TaskContext` yaradıldı.
* `useReducer` vasitəsilə task state-in idarə olunması həyata keçirildi.
* `TaskProvider` bütün tətbiqi əhatə edəcək şəkildə əlavə edildi.
* Task əlavə etmək üçün `ADD_TASK` action yaradıldı.
* Task silmək üçün `DELETE_TASK` action yaradıldı.
* Task-ın tamamlanma vəziyyətini dəyişmək üçün `TOGGLE_TASK` action yaradıldı.
* Task məlumatını redaktə etmək üçün `UPDATE_TASK` action yaradıldı.
* Bütün taskları təmizləmək üçün `CLEAR_TASKS` action yaradıldı.
* Task siyahısını yeniləmək üçün `SET_TASKS` action əlavə edildi.
* `useTasks` custom hook-u yaradılaraq Context istifadəsi sadələşdirildi.
* Task komponentləri arasında lazımsız prop drilling-in qarşısı alındı.

### İstifadə olunan texnologiyalar

* React Context API
* `useReducer`
* Custom Hooks
* React Components
* JavaScript

Bu checkpoint nəticəsində task məlumatlarının komponentlər arasında prop drilling olmadan qlobal şəkildə idarə olunması təmin edilmişdir.
## Checkpoint 4 — Validasiyalı Formlar

Bu mərhələdə Task Manager layihəsində task əlavə etmə və redaktə etmə formalarına manual validation əlavə edilmişdir.

### Görülən işlər

* Task əlavə etmə forması validasiya edildi.
* Task adı boş buraxıldıqda xəta mesajı göstərilir.
* Task adının minimum 3 simvol olması tələb olunur.
* Task adının maksimum 100 simvol olması təmin edildi.
* `maxLength` atributundan istifadə edildi.
* İstifadəçi input-a yenidən yazmağa başladıqda validation mesajı yenilənir.
* Düzgün məlumat daxil edilmədən form submit edilmir.
* Task redaktə forması üçün də eyni validation qaydaları tətbiq edildi.
* Edit zamanı səhv məlumat daxil edildikdə task yenilənmir.
* Edit əməliyyatını ləğv etmək üçün `Ləğv et` düyməsi əlavə edildi.
* Validation error-lar istifadəçiyə input-un altında göstərilir.
* `aria-invalid` və `aria-describedby` atributlarından istifadə edilərək form accessibility yaxşılaşdırıldı.
* Form submit zamanı `preventDefault()` istifadə edildi.


Bu mərhələdə əlavə form kitabxanasından istifadə edilməmiş, validation manual şəkildə React state və JavaScript vasitəsilə həyata keçirilmişdir.
## Checkpoint 5 — Mock API və CRUD Əməliyyatları

Bu mərhələdə Task Manager layihəsinə `json-server` vasitəsilə mock backend əlavə edilmişdir. Task məlumatları artıq yalnız React state-də deyil, `db.json` faylında saxlanılır.

### Görülən işlər

* `json-server` layihəyə əlavə edildi.
* `db.json` mock database kimi yaradıldı.
* Task API üçün `GET`, `POST`, `PATCH` və `DELETE` əməliyyatları yaradıldı.
* API sorğuları ayrıca `taskService.js` faylında təşkil edildi.
* Tətbiq açıldıqda tasklar API-dən yüklənir.
* Yeni task əlavə edildikdə API-yə `POST` sorğusu göndərilir.
* Task redaktə edildikdə `PATCH` sorğusu göndərilir.
* Task silindikdə `DELETE` sorğusu göndərilir.
* Task tamamlanma statusu dəyişdikdə `PATCH` sorğusu göndərilir.
* API xətaları istifadəçiyə göstərilir.
* Taskların yüklənməsi zamanı loading vəziyyəti göstərilir.

### Optimistic UI

Task əlavə etmə, silmə, redaktə və status dəyişdirmə zamanı əvvəlcə istifadəçi interfeysi yenilənir. Daha sonra API sorğusu göndərilir.

Əgər API əməliyyatı uğurlu olarsa, dəyişiklik saxlanılır.

Əgər API əməliyyatı uğursuz olarsa, əvvəlki state bərpa edilir. Bu yanaşma optimistic UI və rollback mexanizmini təmin edir.

### Mock server

Layihədə mock server aşağıdakı command ilə başladılır:

```bash
npm run server
```

Mock API:

```text
http://localhost:3001/tasks
```

Frontend isə ayrıca:

```bash
npm run dev
```

command ilə başladılır.

Bu checkpoint nəticəsində Task Manager artıq mock backend ilə işləyən CRUD tətbiqinə çevrilmişdir.

## Checkpoint 6 — Error Boundary

Bu mərhələdə React tətbiqində baş verən gözlənilməz render xətalarının bütün tətbiqi çökdürməsinin qarşısını almaq üçün Error Boundary əlavə edilmişdir.

### Görülən işlər

* `ErrorBoundary` class component-i yaradıldı.
* `getDerivedStateFromError` lifecycle metodu istifadə edildi.
* `componentDidCatch` vasitəsilə xətaların loglanması təmin edildi.
* Tətbiqin əsas komponent ağacı Error Boundary ilə əhatə edildi.
* Xəta baş verdikdə istifadəçiyə fallback UI göstərilir.
* İstifadəçiyə səhifəni yeniləmək imkanı verildi.
* Development mühitində texniki xəta məlumatlarının göstərilməsi əlavə edildi.
* Error Boundary-nin işləməsini yoxlamaq üçün test komponenti yaradıldı.

### Fallback UI

Xəta baş verdikdə istifadəçiyə:

```text
😕 Nəsə səhv getdi

Tətbiqdə gözlənilməz xəta baş verdi.

[Səhifəni yenilə]
```

mesajı göstərilir.

### İstifadə olunan React xüsusiyyətləri

* Class Components
* `getDerivedStateFromError`
* `componentDidCatch`
* Error Boundary pattern

Bu mərhələ nəticəsində komponentlərdən birində render xətası yarandıqda bütün tətbiqin ağ ekranla çökməsinin qarşısı alınmışdır.
