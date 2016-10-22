(ns hello)

; Segment
(defn make-segment [start end]
  {:start start :end end})

(defn start-segment [segment]
  (segment :start))

(defn end-segment [segment]
  (segment :end))

(defn midpoint-segment [segment]
  (make-point (/ 2 (x-point segment))
              (/ 2 (y-point segment))))

(defn length-segment [segment]
  ())


; Point
(defn make-point [x y]
  {:x x :y y})

(defn x-point [point]
  (:x point))

(defn y-point [point]
  (:y point))


; Rectangle
(defn make-rectangle [h v]
  {:h h :v v})

(defn perimeter [rectangle]
  ())


; print
(defn print-point [p]
  (println "(" (x-point p) "," (y-point p) ")"))
